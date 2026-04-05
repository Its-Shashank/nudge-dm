import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false
})

const AttributionContent = dynamic(() => import('./attribution-content'), {
  ssr: false
})

export default function CreateCampaignAttributionPage() {
  return (
    <DashboardLayout>
      <AttributionContent />
    </DashboardLayout>
  )
}
