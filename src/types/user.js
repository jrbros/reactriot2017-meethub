
class User {

    static fromGithubOject({avatar_url, name, login, html_url, company, followers, email,
                            public_repos, blog, location=[], languages=[]}) {
        return new User({
            avatarUrl: avatar_url,
            name,
            login,
            htmlUrl: html_url,
            company,
            followers,
            email,
            public_repos,
            blog,
            location,
            languages
        })
    }

    constructor({avatarUrl, name, login, htmlUrl, company, followers, email,
                publicRepos, blog, location=[], languages=[]}) {
        this.avatarUrl = avatarUrl;
        this.login = login
        this.name = name ? name : login;
        this.htmlUrl = htmlUrl;
        this.company = company ? company : 'Not Specified';
        this.followers = followers ? followers : 0;
        this.email = email ? email : null;
        this.publicRepos = publicRepos ? publicRepos : 0;
        this.blog = blog ? blog : 'Not Specified';
        this.location = location && location.length > 0 ? location : 'Not Specified';
        this.trueLocation = location  === 'Not Specified' ? '' : this.location;
        this.languages = languages ? [...new Set([...languages])] : [];
    }
}

export default User;
