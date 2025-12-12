import React, { useRef, useState } from "react";
import { getAccounts, deleteAccount, getAccountDetails } from "@/services/AccountService";
import { useAccountStore } from "@/store/account.store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { AccountResponse } from "@/types/AccountTypes";
import FilterDialog from "@/components/FilterDialog";
import { useAuthStore } from "@/store/auth.store";
import AccountActionDialog from "@/components/AccountActionDialog";
import { DialogType } from "@/types/enum";
import type { DialogType as DialogTypeType } from "@/types/enum";
import { useAccountDetailStore, useSelectedAccountStore } from "@/store/account.detail.store";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import AccountDetailDialog from "@/components/AccountDetailDialog";

function AccountPage() {
  const accountStore = useAccountStore();
  const accountDetailStore = useAccountDetailStore();
  const userStore = useAuthStore();
  //localstates
  const selectedAccountStore = useSelectedAccountStore();
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [actionVisible, setActionVisible] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<DialogTypeType | null>(null);
  const [detailDialogVisible, setDetailDialogVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const fetchAccounts = async () => {
    const accounts = await getAccounts();
    accountStore.setAccounts(accounts);
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  const createAccount = () => {
    setDialogType(DialogType.CREATE);
    setActionVisible(true);
  };
  const updateAccount = (row: AccountResponse) => {
    selectedAccountStore.setSelectedAccount(row);
    setDialogType(DialogType.UPDATE);
    setActionVisible(true);
  };

  const onDeleteAccount = (event: any, row: AccountResponse) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this account?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await deleteAccount(row.id);
          accountStore.setAccounts(accountStore.accounts.filter((acc) => acc.id !== row.id));
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Account is successfully deleted.",
            life: 3000,
          });
        } catch (e: any) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: e?.response?.data?.error,
            life: 3000,
          });
        }
      },
      reject: () => {
        console.log("User rejected deletion");
      },
    });
  };

  const seeAccountDetails = async (account: AccountResponse) => {
    const response = await getAccountDetails(account.id);
    accountDetailStore.setAccountDetail(response);
    setDetailDialogVisible(true);
  };
  const detailsBodyTemplate = (account: AccountResponse) => {
    return (
      <Button
        icon="pi pi-eye"
        outlined
        rounded
        className="p-button-sm"
        onClick={() => seeAccountDetails(account)}
      />
    );
  };

  //action column buttons
  const actionBodyTemplate = (account: AccountResponse) => {
    return (
      <div className="flex">
        <Button
          icon="pi pi-pencil"
          text
          rounded
          className="p-button-sm"
          onClick={() => updateAccount(account)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          rounded
          className="p-button-sm"
          onClick={(e) => onDeleteAccount(e, account)}
        />
      </div>
    );
  };

  //header of table
  const header = (
    <div className="flex justify-between gap-2">
      <span className="text-xl text-900 font-bold">My Accounts</span>
      <div>
        <Button icon="pi pi-plus" label="Create New" onClick={() => createAccount()} raised />
        <Button
          onClick={() => setFilterVisible(true)}
          className="ml-2!"
          icon="pi pi-filter"
          label="Filter"
          text
        ></Button>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div>
        <h1 className="text-2xl">Welcome {userStore.username}</h1>

        <DataTable
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 50, 100]}
          header={header}
          value={accountStore.accounts}
          className="mt-4 w-full"
        >
          <Column field="accountName" header="Name" />
          <Column field="accountNumber" header="Number" />
          <Column header="Details" body={detailsBodyTemplate} />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
      <FilterDialog isVisible={filterVisible} setVisible={setFilterVisible} />
      <ConfirmPopup />
      <AccountActionDialog
        isVisible={actionVisible}
        setVisible={setActionVisible}
        dialogType={dialogType}
      />
      <AccountDetailDialog visible={detailDialogVisible} setVisible={setDetailDialogVisible} />
    </>
  );
}

export default AccountPage;
