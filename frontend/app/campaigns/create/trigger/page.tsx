import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false
})

const TriggerContent = dynamic(() => import('./trigger-content'), {
  ssr: false
})

export default function CreateCampaignTriggerPage() {
  return (
    <DashboardLayout>
      <TriggerContent />
    </DashboardLayout>
  )
}
