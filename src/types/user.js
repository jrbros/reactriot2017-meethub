
class User {

    static fromGithubOject({avatar_url, name, login, html_url, location=[], languages=[]}) {
        return new User({
            avatarUrl: avatar_url,
            name,
            login,
            htmlUrl: html_url,
            location,
            languages
        })
    }

    constructor({avatarUrl, name, login, htmlUrl, location=[], languages=[]}) {
        this.avatarUrl = avatarUrl;
        this.login = login
        this.name = name ? name : login;
        this.htmlUrl = htmlUrl;
        this.location = location && location.length > 0 ? location : 'Not specified';
        this.languages = languages ? [...new Set([...languages])] : [];
    }
}

export default User;
