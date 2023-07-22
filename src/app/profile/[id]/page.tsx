function UserProfile({ params }: any) {
  console.log('logging ?????', params.id);

  return <h1>UserProfile - {params.id}</h1>;
}

export default UserProfile;
