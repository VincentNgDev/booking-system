/**
 * To create a standard reusable responsive page container for every page in the app.
 * @param children
 * @returns
 */
export default function PageContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
