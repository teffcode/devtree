type ErrorMessageProps = {
  children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p>{children}</p>
  )
};
