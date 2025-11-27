import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface TitlePageProps {
  title: string;
  description: string;
}

function TitlePage({ title, description }: TitlePageProps) {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default TitlePage;
