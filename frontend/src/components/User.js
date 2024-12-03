export default function User(props) {
  return (
    <>
    <p>
      <b>Email:</b> {props.email_address}
    </p>
    <p>
      <b>Password:</b> {props.password}
    </p>
    </>
  );
}
