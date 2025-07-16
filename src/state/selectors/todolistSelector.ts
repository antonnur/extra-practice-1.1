import { TodolistType } from "../../App"
import { AppRootStateType } from "../store"

export const todolistsSelector = (state: AppRootStateType): Array<TodolistType> => state.todolists