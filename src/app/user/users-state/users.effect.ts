import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { UsersApiServiceService } from "../../core/services/users-api-service.service";
import * as UserAction from "./users.action";
import { catchError, map, of, switchMap } from "rxjs";

export const usersEffects = createEffect(() => {
    const actions$ = inject(Actions);
    const usersService = inject(UsersApiServiceService);

    return actions$.pipe(
        ofType(UserAction.initUsers),
        switchMap(()=>
            usersService.getUsers().pipe(
                map((users) => UserAction.loadUsersSuccess({ users: users })),
                catchError((error) =>{
                    console.log(`Error`, error);
                    return of(UserAction.loadUsersFailure({ error }));
                })
            )
        )
    )
    },
    {functional: true}
)