import {
  FormFieldInput,
  FormFieldSingleSelect,
  FormOnSubmit,
  FormPage,
} from "@workspace/ui/components/form-field/edit/form-field";
import { SearchPanel } from "@workspace/ui/components/panel/search-panel";
import { cn } from "@workspace/ui/lib/utils";

async function getData(data: any) {
  "use server";
  console.log("Form submitted with data:", data);
}

export default function FunctionPage() {
  return (
    <main className={cn("flex py-[10px]")}>
      <FormPage onformSubmit={getData} initialValue={{
        "input1": "value1",
        "select1": "value1",
      }}>
        
        <FormFieldInput
          propertyName={"input1"}
          caption="Caption Caption Caption Caption"
          fieldSpan="full"
        />
        <FormFieldInput
          propertyName={"input2"}
          caption="Caption Caption Caption Caption"
        />
        <FormFieldSingleSelect
          propertyName={"select1"}
          caption="Caption Caption Caption Caption"
          options={[
            { name: "Option 1", value: "option1" },
            { name: "Option 2", value: "option2" },
            { name: "Option 3", value: "option3" },
          ]}
        />
        <FormFieldSingleSelect
          propertyName={"select2"}
          caption="Caption Caption Caption Caption"
          fieldSpan="full"
          options={[]}
        />
        <FormOnSubmit />
      </FormPage>
    </main>
  );
}
