import axios from "axios";

const GoogleBookService = {
    url: 'https://www.googleapis.com/books/v1/volumes?q=<<search_string>>&key=AIzaSyC1TNlk2jSJnEEkOr6MGLB2j8l2WH96mnc',
    getBooks : function(value){
        var searchString = encodeURI(value);
        var googleUri = this.url.replace('<<search_string>>',searchString);
        console.log(googleUri);
        return axios.get(googleUri);
    }   
}

export default GoogleBookService;