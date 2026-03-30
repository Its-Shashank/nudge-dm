import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center surface">
      <div className="text-on-surface-variant">Loading...</div>
    </div>
  )
})

const CampaignsContent = dynamic(() => import('./campaigns-content'), {
  ssr: false
})

export default function CampaignsPage() {
  return (
    <DashboardLayout>
      <CampaignsContent />
    </DashboardLayout>
  )
}
