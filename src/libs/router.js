import { ref } from "vue"

const useRouter = (pages, firstPageName) => {
    const currentPage = ref(pages.find(page => page.name === firstPageName))
    const navigate = (pageName) => {
        currentPage.value = pages.find(page => page.name === pageName)
    }
    const playRoutes = ({ pageNames, time = 2000 }) => {
        pageNames.forEach((pageName, i) => {
            setTimeout(() => {
                navigate(pageName)
            }, time * i)
        })
    }
    const on = (pageName) => currentPage.value.name === pageName
    return { currentPage, navigate, playRoutes, on }
}

export default useRouter