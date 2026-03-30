import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false
})

const ConversionContent = dynamic(() => import('./conversion-content'), {
  ssr: false
})

export default function CreateCampaignConversionPage() {
  return (
    <DashboardLayout>
      <ConversionContent />
    </DashboardLayout>
  )
}
