export default function InputGroup({
  id,
  label,
  wrapperClass = 'control',
  ...props
}) {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}
