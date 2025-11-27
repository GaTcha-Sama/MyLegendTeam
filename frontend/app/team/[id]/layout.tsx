export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout spécifique pour la page de partage - sans Navbar ni Footer
  return (
    <>
      {children}
    </>
  );
}

