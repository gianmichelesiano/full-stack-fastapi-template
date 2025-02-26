import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  return (
    <div className="container max-w-full">
      <h2 className="text-sm font-bold py-4">
        Delete Account
      </h2>
      <p className="text-muted-foreground">
        Permanently delete your data and everything associated with your
        account.
      </p>
      <DeleteConfirmation />
    </div>
  )
}
export default DeleteAccount
