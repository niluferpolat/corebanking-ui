import type { CreateAccountRequest, UpdateAccountRequest } from "@/types/AccountTypes";
import { DialogType } from "@/types/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createAccount, updateAccountName } from "@/services/AccountService";
import { useAccountStore } from "@/store/account.store";
import { Toast } from "primereact/toast";
import { useSelectedAccountStore } from "@/store/account.detail.store";

interface AccountActionProps {
  setVisible: (visible: boolean) => void;
  isVisible: boolean;
  dialogType: DialogType | null;
}

function AccountActionDialog(props: AccountActionProps) {
  const accountStore = useAccountStore();
  const selectedAccountStore = useSelectedAccountStore();
  const toast = useRef<Toast>(null);
  const schema = yup
    .object({
      accountName: yup.string().min(5).required("Account Name is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (props.isVisible && props.dialogType === DialogType.UPDATE) {
      reset({
        accountName: selectedAccountStore.selectedAccount?.accountName || "",
      });
    }

    if (props.isVisible && props.dialogType === DialogType.CREATE) {
      reset({
        accountName: "",
      });
    }
  }, [props.isVisible, props.dialogType]);
  const onSubmit = useCallback(
    async (data: CreateAccountRequest) => {
      if (props.dialogType === DialogType.CREATE) {
        try {
          const response = await createAccount(data);
          accountStore.setAccounts([...accountStore.accounts, response]);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Account is successfully created.",
            life: 3000,
          });
          props.setVisible(false);
        } catch (e: any) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: e?.response?.data?.error || e?.message || "Update failed",
            life: 3000,
          });
        }
      }
      if (props.dialogType === DialogType.UPDATE) {
        try {
          const request: UpdateAccountRequest = {
            id: selectedAccountStore.selectedAccount?.id,
            accountName: data.accountName,
          };
          const updatedAccount = await updateAccountName(request);
          const updatedList = accountStore.accounts.map((acc) =>
            acc.id === updatedAccount.id ? updatedAccount : acc
          );

          accountStore.setAccounts(updatedList);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Account is successfully updated.",
            life: 3000,
          });
          props.setVisible(false);
        } catch (e: any) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: e?.response?.data?.error || e?.message || "Update failed",
            life: 3000,
          });
        }
      }
    },
    [props.dialogType, props.setVisible, accountStore, selectedAccountStore]
  );
  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        className="w-100 card shadow-2xl"
        visible={props.isVisible}
        onHide={() => props.setVisible(false)}
        header={props.dialogType + " Account"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-3">
            <InputText {...register("accountName")} className="w-full" placeholder="Account Name" />
            {errors.accountName && (
              <p className="text-red-500 text-sm ml-1 " role="alert">
                {errors.accountName.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mr-3">
            <Button type="submit" label="Search" className="w-20" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default AccountActionDialog;
