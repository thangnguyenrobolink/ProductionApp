import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode  } from 'jwt-decode';

const LoginApi = async (email, hashpassword) => {
    const url = 'http://localhost/api/token/';
    const data = {
        username: email,
        password: hashpassword,
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { access, refresh } = response.data
        if (access) {
            try {
            const decodedToken = jwtDecode(access);
            const userid = decodedToken.user_id;
            localStorage.setItem('userId', userid);
            if (decodedToken) {
                toast.success(userid, { autoClose: 500 });
            } else {
                toast.error('Failed to decode token', { autoClose: 500 });
            }
            } catch (error) {
            console.error('Failed to decode token:', error);
            toast.error('Failed to decode token', { autoClose: 500 });
            }
        }
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        
        return access;
    } catch (error) {
        console.error('Error with login request:', error);
        return null;
    }
};

export { LoginApi };

// Function to fetch user info using access token
const fetchUserInfo = async (accessToken, userId) => {
    const url = `http://localhost/api/users/${userId}/`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Token expired or invalid');
        } else {
            toast.error(`Error fetching user info: ${error.message}`);
        }
        return null;
    }
};

export { fetchUserInfo };
// Function to fetch users from API
const usersFromApi = async () => {
    const API_URL = 'http://localhost/api/users/';
    const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

    if (!token) {
        console.error('No access token found in localStorage');
        return [];
    }

    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = response.data.results.map(user => ({
            id: user.id,
            avatarUrl: `/assets/images/avatars/avatar_${user.id + 1}.jpg`, // Adjust field names as necessary
            name: user.username,
            company: user.email,
            isVerified: user.is_staff,
            status: 'active',
            role: 'Leader',
        }));

        toast.success('Load Users successful!', { autoClose: 500 });
        return users;
    } catch (error) {
        toast.error(`Error fetching users: ${error.message}`);
        return [];
    }
};

export {usersFromApi};
