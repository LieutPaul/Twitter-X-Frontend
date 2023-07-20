import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './EditProfileModal.scss';
import { updateUser } from './ProfileAPIs';

export default function EditProfileModal({ name, username, bio, showEditProfile, setShowEditProfile }) {

    const [newName, setNewName] = React.useState(name || '');
    const [newUsername, setNewUsername] = React.useState(username || '');
    const [newBio, setNewBio] = React.useState(bio || '');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleBioChange = (e) => {
        setNewBio(e.target.value);
    };

    React.useEffect(() => {
        setNewName(name || '');
        setNewUsername(username || "");
        setNewBio(bio || "");
    }, [name,username,bio,showEditProfile]);

    const handleSubmit = async () => {
        
        if(newUsername.trim() === "" || newName.trim() === ""){
            alert("Username and name cannot be left empty.")
            return ;
        }
        const res = await updateUser(newBio, newUsername, newName);
        if (res === null) {
            alert('Failed to update. Mostly because there is already another user with the same username.');
        } else {
            setShowEditProfile(false);
            window.location.reload();
        }
    };

    return (
        <Modal show={showEditProfile} onHide={()=>setShowEditProfile(false)}>
            <Modal.Header closeButton>
                <div className='w-full flex justify-between items-center'>
                <div className='font-bold text-[20px]'>Edit Profile</div>
                <div>
                    <button onClick={handleSubmit} className='bg-[black] text-white pe-4 ps-4 rounded-[20px] pt-1 pb-1'>
                    Save
                    </button>
                </div>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className='change-profile-details flex items-center justify-between'>
                    <span className='floating-label'>Name</span> :
                    <input type='text' className='inputText' value={newName} onChange={handleNameChange}></input>
                </div>

                <div className='mt-3 change-profile-details flex items-center justify-between'>
                    <span className='floating-label'>Username</span> :
                    <input type='text' className='inputText' value={newUsername} onChange={handleUsernameChange}></input>
                </div>

                <div className='mt-3 change-profile-details flex items-center justify-between'>
                    <span className='floating-label'>Bio</span> :
                    <input type='text' className='inputText' value={newBio} onChange={handleBioChange}></input>
                </div>
            </Modal.Body>
        </Modal>
    );
}
