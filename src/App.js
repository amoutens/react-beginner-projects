import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import ContentLoader from 'react-content-loader';

// Тут список пользователей: https://reqres.in/api/users

function App() {
const [users, setUsers] = React.useState([]);
const [isLoading, setLoading] = React.useState(true);
const [searchVal, setSearchVal] = React.useState('');
const [invites, setInvites] = React.useState([]);
const [success, setSuccess] = React.useState(false);
React.useEffect(() => {
  fetch('https://reqres.in/api/users').then(res => res.json()).then(json => {setUsers(json.data)}).catch(err => {alert('Произошла ошибка')}).finally(() => setLoading(false));
  
}, []);


// huinya peredelivay
  const onChangeSearchValue = (event) => {
    setSearchVal(event.target.value);
  }

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    }
    else{
      setInvites(prev => [...prev, id])
    }
  }

  const onClickSendInvites= () => {
    setSuccess(true);
  }
  return (
    <div className="App">
      {
        success ? (<Success count={invites.length}/>): <Users onChangeSearchValue={onChangeSearchValue} searchVal={searchVal} items = {users} isLoading={isLoading} invites={invites} onClickInvite={onClickInvite} onClickSendInvites={onClickSendInvites} />
      }
      
      
    </div>
  );
}

export default App;
