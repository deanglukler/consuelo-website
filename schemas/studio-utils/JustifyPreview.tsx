const JustifyPreview: React.FC<React.PropsWithChildren> = (props) => (
  <span
    style={{
      display: 'block',
      textAlign: 'justify',
      textJustify: 'inter-word',
    }}
  >
    {props.children}
  </span>
)

export default JustifyPreview
