import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const items = [
  {
    id: "CREATE",
    label: "Create",
  },
  {
    id: "READ",
    label: "Read",
  },
  {
    id: "UPDATE",
    label: "Update",
  },
  {
    id: "DELETE",
    label: "Delete",
  },
] as const;

const CRUDCheckBox = ({
  form,
  name,
  icon: Icon,
  color,
}: {
  name: string;
  form: any;
  icon: any;
  color: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base capitalize flex gap-2 items-center justify-start">
              <Icon className={cn("h-5 w-5 mr-3", color)} />
              {name}
            </FormLabel>
          </div>
          <div className="flex gap-2 px-2">
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.length === 4}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange(items.map((e) => e.id))
                            : field.onChange([]);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">CRUD</FormLabel>
                  </FormItem>
                );
              }}
            />

            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CRUDCheckBox;
