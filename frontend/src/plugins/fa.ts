import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faUserSecret,
    faMagnifyingGlass,
    faSort,
    faSortAsc,
    faSortDesc,
    faCheck,
    faClose,
    faPen,
    faTrash,
    faCaretDown,
    faCaretUp,
    faCalendar,
    faUser,
} from '@fortawesome/free-solid-svg-icons'

export function createFontAwesome() {
    const icons = [
        faUserSecret,
        faMagnifyingGlass,
        faSort,
        faSortAsc,
        faSortDesc,
        faCheck,
        faClose,
        faPen,
        faTrash,
        faCaretDown,
        faCaretUp,
        faCalendar,
        faUser
    ]

    library.add(...icons)
}