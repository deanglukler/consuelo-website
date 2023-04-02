export default function Container({
  children,
}: React.PropsWithChildren & React.HTMLProps<HTMLDivElement>) {
  return <div className="container mx-auto px-5 md:px-20">{children}</div>
}
