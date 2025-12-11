import React from "react";
import { getAccounts } from "@/services/AccountService";
import { useAccountStore } from "@/store/account.store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { AccountResponse } from "@/types/AccountTypes";

function AccountPage() {
  const accountStore = useAccountStore();

  const fetchAccounts = async () => {
    const accounts = await getAccounts();
    accountStore.setAccounts(accounts);
  };

  React.useEffect(() => {
    fetchAccounts();
  }, []);

  const detailsBodyTemplate = (account: AccountResponse) => {
    return (
      <Button
        icon="pi pi-eye"
        outlined
        rounded
        className="p-button-sm"
        onClick={() => console.log("Details:", account)}
      />
    );
  };

  const header = (
    <div className="flex justify-between gap-2">
      <span className="text-xl text-900 font-bold">My Accounts</span>
      <div>
        <Button icon="pi pi-plus" label="Create New" raised />
        <Button className="ml-2!" icon="pi pi-filter" label="Filter" text></Button>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl">fsdfs</h1>

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
      </DataTable>
    </div>
  );
}

export default AccountPage;
