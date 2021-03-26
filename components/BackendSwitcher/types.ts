export interface BackendSwitcherProps {

}

export interface BackendSwitcherState {
  display: boolean
  items: BackendItem[]
}

export interface BackendItem {
  id: string
  title: string
  url: string
  isDefault: boolean
}
