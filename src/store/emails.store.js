export const EMAIL_LOAD = 'EMAIL_LOAD';
export const EMAIL_CREATE = 'EMAIL_CREATE';
export const EMAIL_DELETE = 'EMAIL_DELETE'

import emailService from '../services/email/email.service';

const state = {
    emails: [],
    filterBy: { text: '', emailStatus: 'All' },
    selectedEmail: null,
}

const getters = {
    emailsCount({ emails }) {
        if (emails) return emails.length;
    },
    filteredEmails({ filterBy }, getters) {
        let filtered = getters.reversedEmails;
        if (filterBy) {
            if (filterBy.emailStatus === 'Read') {
                filtered = getters.readEmails;
            }
            else if (filterBy.emailStatus === 'UnRead') {
                filtered = getters.unreadEmails;
            }
            if (filterBy.text) {
                filtered = filtered.filter(email => {
                    var searchStr = new RegExp(filterBy.text, 'i')
                    return email.body.search(searchStr) >= 0 || email.subject.search(searchStr) >= 0
                });
            }
        }
        return filtered;
    },
    readEmails({ emails }) {
        return emails.filter(email => email.isRead);
    },
    unreadEmails({ emails }) {
        return emails.filter(email => !email.isRead);
    },
    readPerc({ emails }, getters) {
        if (emails && emails.length > 0) {
            var readCount = getters.readEmails.length;
            return parseInt((readCount / (emails.length) * 100));
        }
        else return 100;
    },
    reversedEmails: state => {
        return state.emails.slice().reverse();
    }
}
const mutations = {
    [EMAIL_LOAD](state, { emails }) {
        console.log(emails)
        state.emails = emails;
        if (emails && emails.length > 0) state.selectedEmail = emails[0];
    },
    [EMAIL_CREATE](state, { email }) {
        state.emails.push(email);
    },
    [EMAIL_DELETE](state, { email }) {
        const idx = state.emails.findIndex(currEmail => currEmail._id === email._id);
        if (idx === -1) {
            console.log('error in finding email to delete from store');
            return;
        }
        state.emails.splice(idx, 1);
        state.selectedEmail = state.emails[0];
    },
    setFilterEmail(state, { filter }) {
        state.filterBy = filter;
    },
    selectEmail(state, { email }) {
        const idx = state.emails.findIndex(currEmail => currEmail._id === email._id);
        if (idx === -1) {
            console.log('error in finding email to update in store');
            return;
        }
        //splice is not needed if the new and old email are the same - need to improve
        state.emails.splice(idx, 1, email);
        state.selectedEmail = email;
    }
}
const actions = {
    [EMAIL_LOAD](context, payload) {
        emailService.getEmails()
            .then(emails => {
                payload.emails = emails;
                context.commit(payload)
            });
    },
    [EMAIL_CREATE](context, payload) {
        emailService.saveEmail(payload.email)
            .then(email => {
                payload.email = email;
                context.commit(payload);
            })
    },
    [EMAIL_DELETE](context, payload) {
        emailService.archiveEmail(payload.email)
            .then(res => {
                context.commit(payload)
            })
    },
    selectEmail(context, payload) {
        emailService.updateEmail(payload.email)
            .then(res => {
                context.commit(payload)
            })
    }
}

export const emailStore = {
    state,
    getters,
    mutations,
    actions
}