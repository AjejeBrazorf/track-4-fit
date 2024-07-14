import Link from "next/link";

export const Navbar = () => {
  const menuItems = [{ label: "test" }];

  return (
    <ul>
      {menuItems.map((item: { label: string }, index) => (
        <li key={`${item.label}-${index}`}>
          <Link href="#">{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};
