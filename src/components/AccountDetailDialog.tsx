import { useAccountDetailStore } from "@/store/account.detail.store";
import { Dialog } from "primereact/dialog";
import moment from "moment";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

function AccountDetailDialog(props: { visible: boolean; setVisible: any }) {
  const accountDetailStore = useAccountDetailStore();
  const navigate = useNavigate();

  return (
    <div>
      <Dialog
        className="w-100 card shadow-2xl"
        visible={props.visible}
        onHide={() => props.setVisible(false)}
        header={"Account Details"}
      >
        <span className="flex w-full mb-2">
          <p className="font-bold text-md">Account Name:</p>
          <p className="text-md ml-2">{accountDetailStore.accountDetail?.accountName}</p>
        </span>
        <span className="flex w-full mb-2">
          <p className="font-bold text-md">Account Number:</p>
          <p className="text-md ml-2">{accountDetailStore.accountDetail?.accountNumber}</p>
        </span>
        <span className="flex w-full mb-2">
          <p className="font-bold text-md">Balance:</p>
          <p className="text-md ml-2">{accountDetailStore.accountDetail?.balance}</p>
        </span>
        <span className="flex w-full mb-2">
          <p className="font-bold text-md">Created At:</p>
          <p className="text-md ml-2">
            {moment(accountDetailStore.accountDetail?.createdDate).format("DD/MM/YYYY HH:mm:ss")}
          </p>
        </span>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate("/transactions")} label="Go To Transaction History" />
        </div>
      </Dialog>
    </div>
  );
}

export default AccountDetailDialog;
