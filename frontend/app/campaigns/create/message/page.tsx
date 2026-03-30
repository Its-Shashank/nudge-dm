import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false
})

const MessageContent = dynamic(() => import('./message-content'), {
  ssr: false
})

export default function CreateCampaignMessagePage() {
  return (
    <DashboardLayout>
      <MessageContent />
    </DashboardLayout>
  )
}
