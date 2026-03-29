from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import random

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============= MODELS =============

class Campaign(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    keyword: str
    platform: str
    status: str  # Active, Scheduled, Draft
    dms_sent: int = 0
    click_rate: float = 0.0
    conversion_rate: float = 0.0
    revenue: float = 0.0
    date: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AnalyticsSummary(BaseModel):
    model_config = ConfigDict(extra="ignore")
    total_revenue: float
    revenue_change: float
    total_campaigns: int
    pending_approval: int
    avg_conversion: float
    total_dms_sent: int
    total_clicks: int

class RevenueDataPoint(BaseModel):
    day: str
    revenue: float

class CampaignPerformance(BaseModel):
    campaign_name: str
    dms_sent: int
    click_rate: float
    conversion_rate: float
    revenue: float

class OptimizationInsight(BaseModel):
    type: str  # keyword, post, alert
    title: str
    value: str
    description: str
    metric: Optional[str] = None

class ContentItem(BaseModel):
    id: str
    title: str
    platform: str
    reach: str
    sentiment: str
    sentiment_score: float
    revenue: float
    published: str
    avatar: str

class DashboardMetrics(BaseModel):
    total_active_revenue: float
    revenue_change: float
    live_campaigns: int
    pending_campaigns: int
    avg_conversion: float

# ============= HELPER FUNCTIONS =============

def generate_mock_revenue_data(period: str = "7days") -> List[Dict[str, Any]]:
    """Generate mock time-series revenue data"""
    days_map = {"realtime": 7, "7days": 7, "30days": 30, "alltime": 90}
    days = days_map.get(period, 7)
    
    data = []
    base_revenue = 15000
    
    day_names = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    
    for i in range(days):
        if days <= 7:
            day_label = day_names[i % 7]
        else:
            day_label = f"Day {i+1}"
        
        variance = random.uniform(-3000, 5000)
        revenue = base_revenue + variance + (i * 200)
        
        data.append({
            "day": day_label,
            "revenue": round(revenue, 2)
        })
    
    return data

def generate_mock_campaigns() -> List[Dict[str, Any]]:
    """Generate mock campaign data"""
    campaigns = [
        {
            "id": str(uuid.uuid4()),
            "name": "Summer Flash Sale",
            "keyword": "SUMMER24",
            "platform": "Instagram & TikTok",
            "status": "Active",
            "dms_sent": 4281,
            "click_rate": 68.0,
            "conversion_rate": 12.4,
            "revenue": 42900.00,
            "date": "Jun 12, 2024"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Q3 Product Launch",
            "keyword": "INNOVATE",
            "platform": "LinkedIn Exclusive",
            "status": "Scheduled",
            "dms_sent": 1890,
            "click_rate": 42.0,
            "conversion_rate": 8.1,
            "revenue": 0.00,
            "date": "Jul 01, 2024"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Influencer Collab",
            "keyword": "PARTNER",
            "platform": "Multi-channel Hub",
            "status": "Active",
            "dms_sent": 12402,
            "click_rate": 82.0,
            "conversion_rate": 15.2,
            "revenue": 85530.00,
            "date": "May 20, 2024"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Black Friday Early Bird",
            "keyword": "BF24",
            "platform": "Email & Social",
            "status": "Draft",
            "dms_sent": 842,
            "click_rate": 31.0,
            "conversion_rate": 4.2,
            "revenue": 0.00,
            "date": "Pending"
        }
    ]
    return campaigns

def generate_mock_content() -> List[Dict[str, Any]]:
    """Generate mock highest revenue content"""
    content = [
        {
            "id": str(uuid.uuid4()),
            "title": "Q4 Strategy Roadmap",
            "platform": "LinkedIn",
            "reach": "1.2M",
            "sentiment": "Positive",
            "sentiment_score": 98.0,
            "revenue": 42102.00,
            "published": "Published 2 days ago",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=strategy"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "SaaS Pricing Trends",
            "platform": "X / Twitter",
            "reach": "840k",
            "sentiment": "Neutral",
            "sentiment_score": 75.0,
            "revenue": 28450.00,
            "published": "Published 5 days ago",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=pricing"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Case Study: TechFlow",
            "platform": "Newsletter",
            "reach": "120k",
            "sentiment": "Positive",
            "sentiment_score": 94.0,
            "revenue": 19920.00,
            "published": "Published 1 week ago",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=case"
        }
    ]
    return content

# ============= ROUTES =============

@api_router.get("/")
async def root():
    return {"message": "NudgeDM API", "status": "active"}

# Dashboard endpoints
@api_router.get("/dashboard/metrics")
async def get_dashboard_metrics():
    """Get dashboard summary metrics"""
    campaigns = generate_mock_campaigns()
    active_campaigns = [c for c in campaigns if c["status"] == "Active"]
    pending_campaigns = [c for c in campaigns if c["status"] in ["Scheduled", "Draft"]]
    
    total_revenue = sum(c["revenue"] for c in active_campaigns)
    
    return {
        "total_active_revenue": total_revenue,
        "revenue_change": 24.8,
        "live_campaigns": len(active_campaigns),
        "pending_campaigns": len(pending_campaigns),
        "avg_conversion": 18.4
    }

@api_router.get("/campaigns")
async def get_campaigns():
    """Get all campaigns"""
    return generate_mock_campaigns()

@api_router.get("/campaigns/active")
async def get_active_campaigns():
    """Get active campaigns"""
    campaigns = generate_mock_campaigns()
    return [c for c in campaigns if c["status"] == "Active"]

# Analytics endpoints
@api_router.get("/analytics/summary")
async def get_analytics_summary(period: str = Query("7days")):
    """Get analytics summary"""
    campaigns = generate_mock_campaigns()
    active = [c for c in campaigns if c["status"] == "Active"]
    pending = len([c for c in campaigns if c["status"] in ["Scheduled", "Draft"]])
    
    total_revenue = sum(c["revenue"] for c in campaigns)
    total_dms = sum(c["dms_sent"] for c in campaigns)
    avg_conversion = sum(c["conversion_rate"] for c in active) / len(active) if active else 0
    
    return {
        "total_revenue": total_revenue,
        "revenue_change": 26.8,
        "total_campaigns": len(campaigns),
        "pending_approval": pending,
        "avg_conversion": round(avg_conversion, 1),
        "total_dms_sent": total_dms,
        "total_clicks": int(total_dms * 0.65)
    }

@api_router.get("/analytics/revenue")
async def get_revenue_data(period: str = Query("7days")):
    """Get time-series revenue data"""
    return generate_mock_revenue_data(period)

@api_router.get("/analytics/insights")
async def get_optimization_insights():
    """Get optimization insights"""
    return [
        {
            "type": "keyword",
            "title": "BEST KEYWORD",
            "value": "Scale Infrastructure",
            "description": "82% engagement rate",
            "metric": "82%"
        },
        {
            "type": "alert",
            "title": "DROP-OFF ALERT",
            "value": "Checkout Phase",
            "description": "14% increase in abandonment",
            "metric": "14%"
        },
        {
            "type": "insight",
            "title": "AUTOMATED INSIGHT",
            "value": "Optimize for Thursdays",
            "description": "Conversion rates peak between 2PM and 5PM EST on Thursdays. Scheduling automated responses during this window could lift revenue by 12%.",
            "metric": "Apply Optimization →"
        },
        {
            "type": "source",
            "title": "ENGAGEMENT SOURCE",
            "value": "Direct Email",
            "description": "64% of total engagement",
            "metric": "64%"
        },
        {
            "type": "source",
            "title": "ENGAGEMENT SOURCE",
            "value": "Social Referrals",
            "description": "22% of total engagement",
            "metric": "22%"
        }
    ]

@api_router.get("/analytics/content")
async def get_highest_revenue_content():
    """Get highest revenue content"""
    return generate_mock_content()

@api_router.get("/analytics/performance")
async def get_campaign_performance():
    """Get campaign performance data"""
    campaigns = generate_mock_campaigns()
    return [
        {
            "campaign_name": c["name"],
            "dms_sent": c["dms_sent"],
            "click_rate": c["click_rate"],
            "conversion_rate": c["conversion_rate"],
            "revenue": c["revenue"]
        }
        for c in campaigns if c["status"] == "Active"
    ]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()