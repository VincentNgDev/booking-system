type PageTopPanelProps = {
  title?: string;
  description?: string;
  renderSideComponent?: () => React.ReactNode;
};

export default function PageTopPanel({
  title,
  description,
  renderSideComponent
}: PageTopPanelProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      {renderSideComponent && renderSideComponent()}
    </div>
  );
}
