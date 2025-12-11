import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAccountStore } from "@/store/account.store";
import type { SearchAccountsRequest } from "@/types/AccountTypes";
import { searchAccounts } from "@/services/AccountService";

function FilterDialog(props: { isVisible: boolean; setVisible: any }) {
  const accountStore = useAccountStore();

  const schema = yup
    .object({
      accountNumber: yup.string().matches(/^[0-9]*$/, "Account number should contain only numbers"),
      accountName: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: SearchAccountsRequest) => {
    try {
      const response = await searchAccounts(data);
      accountStore.setAccounts(response);
      props.setVisible(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div>
      <Dialog
        className="w-100 card shadow-2xl"
        visible={props.isVisible}
        onHide={() => props.setVisible(false)}
        header="Filter"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-3">
            <InputText
              invalid={!!errors.accountNumber}
              {...register("accountNumber")}
              className="w-full"
              placeholder="Account Number"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm ml-1 " role="alert">
                {errors.accountNumber.message}
              </p>
            )}
          </div>
          <div className="m-3">
            <InputText {...register("accountName")} className="w-full" placeholder="Account Name" />
          </div>
          <div className="flex justify-end mr-3">
            <Button type="submit" label="Search" className="w-20" />
            <Button label="Clear" onClick={() => reset()} className="w-20 ml-2!" outlined />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default FilterDialog;
