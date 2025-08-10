import { DeleteWithConfirmButton, useDelete, useNotify, useRefresh, useRedirect, RaRecord } from 'react-admin';

interface UserDeleteProps {
  record?: RaRecord;
}

const UserDelete = ({ record }: UserDeleteProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const [deleteOne, { isLoading }] = useDelete('users', { id: record?.id, previousData: record });

  const handleDelete = async () => {
    await deleteOne();
    notify('User deleted');
    refresh();
    redirect('/users');
  };

  return (
    <DeleteWithConfirmButton
      record={record}
      resource="users"
      mutationMode="pessimistic"
      onClick={handleDelete}
      disabled={isLoading}
    />
  );
};

export default UserDelete;
