import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('@/components/dashboard-layout'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center surface">
      <div className="text-on-surface-variant">Loading...</div>
    </div>
  )
})

const SettingsContent = dynamic(() => import('./settings-content'), {
  ssr: false
})

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  )
}
