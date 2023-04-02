import AlertBanner from 'components/shared/AlertBanner'

export default function Layout({
  preview = false,
  loading = false,
  children,
}: {
  preview?: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen pb-12">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
      </div>
    </>
  )
}
