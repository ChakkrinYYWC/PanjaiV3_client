import axios from "axios";

const baseUrl = 'http://localhost:3001/'

export default {
    postPanjai(url = baseUrl + 'Too-Panjai/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    postFDT(url = baseUrl + 'Foundation/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    report(url = baseUrl + 'report/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    profile(url = baseUrl + 'profile/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        }
    }
}
