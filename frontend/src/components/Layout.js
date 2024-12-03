import Link from "next/link";

export default function Layout({ children }) {
    return (
      <>
        <ul>
            <li><Link href="/posts">Posts</Link></li>
            <li><Link href="/users">Users</Link></li>
        </ul>
        <main>{children}</main>
      </>
    )
  }