import { useProfileActiveTabStore } from 'src/store/zustand/profileActiveTabStore'


interface Props {

}

export const UserProfileTabsComponent = ({ }: Props) => {

    const { activeTab, setActiveTab } = useProfileActiveTabStore()

    const switchTab = (tab: 0 | 1 | 2) => {
        setActiveTab(tab)
    }

    return (
        <div className="tabs tabs-boxed flex justify-evenly">
            <a onClick={() => switchTab(0)} className={`tab ${activeTab === 0 ? "tab-active !bg-accent !text-accent-content !rounded-none" : ""}`}>Info</a>
            <a onClick={() => switchTab(1)} className={`tab ${activeTab === 1 ? "tab-active !bg-accent !text-accent-content !rounded-none" : ""}`}>Posts</a>
            <a onClick={() => switchTab(2)} className={`tab ${activeTab === 2 ? "tab-active !bg-accent !text-accent-content !rounded-none" : ""}`}>Circle</a>
        </div>
    )
}