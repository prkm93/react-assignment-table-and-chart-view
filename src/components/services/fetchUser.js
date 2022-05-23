import axios from "axios";
import {config} from "../config/constant";

export const fetchUsers = async(setUserList, setAllUsers) => {
    try {
        const response = await axios.get(config.url);
        if (response.status === 200) {
            setUserList(response.data.results.map(user => {
                return {
                    id: `${user.email}-${user.phone}`,
                    name: `${user.name.first} ${user.name.last}`,
                    location: `${user.location.city}, ${user.location.country}`,
                    registered: user.registered.date,
                    phone: user.phone,
                    picture: user.picture.thumbnail
                }
            }));
            setAllUsers(response.data.results.map(user => {
                return {
                    id: `${user.email}-${user.phone}`,
                    name: `${user.name.first} ${user.name.last}`,
                    location: `${user.location.city}, ${user.location.country}`,
                    registered: user.registered.date,
                    phone: user.phone,
                    picture: user.picture.thumbnail
                }
            }));
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}