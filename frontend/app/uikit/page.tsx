import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const UiKit: NextPage = () => {
  return (
    <div>
      <h1 className="bg-green-500 text-white p-4 rounded">UI Kit</h1>
      <Separator className="my-4" />

      <h1 className="bg-blue-500 text-white p-4 rounded">Headers</h1>
      <Separator />
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>

      <Separator />

      <h1 className="bg-blue-500 text-white p-4 rounded">Buttons</h1>
      <Separator />
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="default">Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
};

export default UiKit;
