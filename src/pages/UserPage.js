import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams(); // URL에서 userId를 가져옴

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Page</h1>
      <p>Welcome to the user page for user with ID: {userId}</p>
      {/* 이곳에 해당 사용자에 대한 정보를 추가하면 됩니다 */}
      <div>
        {/* 예시: 사용자 정보 */}
        <h2>User Details</h2>
        <p>Name: [User Name]</p>
        <p>Email: [User Email]</p>
        {/* 추가적인 사용자 정보나 기능을 여기에 추가할 수 있습니다 */}
      </div>
    </div>
  );
};

export default UserPage;
