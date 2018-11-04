import c from '../configuration/settings';
import qs from 'qs';
import AuthService from './authservice';
import moment from 'moment';

export default class WegpiraatService {
    
    constructor() {
        this.service = new AuthService();
    }    
        
    check = async() => {
        if (await this.service.authorised()) {
            let bear = await this.service.spawnBearer();
            return  'Bearer ' + bear;
        } else {
            throw Error("Bear token not present or failed to refresh!")
        }        
    }

    upload = async(data) => {
        
        try {
            let token = await this.check();

            let resp = await fetch(`${c.api}/${c.wegpiraten}`, { 
                method: 'POST', 
                headers: {
                    "Authorization": token,
                    'Accept': 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (resp.status > 400)
                return false;
            else {
                return await resp.json();
            }
        } catch(e) {
            return false;
        }
    }
    
    comment = async(id, comment) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.wegpiraten}/${id}/comment`, 
                { 
                    method: 'POST',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ commentData: comment })
                }               
            );

            if (resp.status > 400)
                return false;            
            return await resp.json();
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getWegpiratenByPlate = async(plate, page) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.search}/${plate}/${page}`, { 
                method: 'GET', 
                headers: {
                    "Authorization": token
                }
            });

            let data = await resp.json();

            if (resp.status > 400)
                return false;
            else {
                return await data;
            }
        } catch(e) {
            console.log(e);
            return false;
        }
    }
    
}