import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';


export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state?: string;
  name?: string;
  type: string;
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}
const MENUITEMS = [
  {
    state: 'account',
    name: 'ACCOUNT',
    type: 'sub',
    icon: 'ion-ios-people',
    children: [
      {
        state: 'signin',
        name: 'SIGNIN'
      },
    ]
  }
]
// const MENUITEMS = [
//   {
//     type: 'title',
//     name: 'MAIN'
//   },
//   {
//     state: '/',
//     name: 'HOME',
//     type: 'link',
//     icon: 'ion-ios-speedometer'
//   },
//   {
//     state: 'docs',
//     name: 'DOCS',
//     type: 'link',
//     icon: 'ion-ios-help'
//   },
//   {
//     type: 'divider'
//   },
//   {
//     type: 'title',
//     name: 'EXTRAS'
//   },
//   {
//     state: 'account',
//     name: 'ACCOUNT',
//     type: 'sub',
//     icon: 'ion-ios-people',
//     children: [
//       {
//         state: 'signin',
//         name: 'SIGNIN'
//       },
//       {
//         state: 'signup',
//         name: 'SIGNUP'
//       },
//       {
//         state: 'forgot',
//         name: 'FORGOT'
//       },
//       {
//         state: 'lockscreen',
//         name: 'LOCKSCREEN'
//       }
//     ]
//   },
//   {
//     state: 'error',
//     name: 'ERROR',
//     type: 'sub',
//     icon: 'ion-ios-information',
//     children: [
//       {
//         state: '404',
//         name: '404'
//       },
//       {
//         state: '500',
//         name: '500'
//       }
//     ]
//   }
// ];

@Injectable()
export class MenuService {
  public menu: any[] = []
  constructor(public auth: AuthService) {
    this.getMenu()
  }

  getAll(): Menu[] {
    return MENUITEMS;
  }

  getMenu() {
    this.auth.getMenu().subscribe(data => {
      this.menu = data.map(x => {
        x['type'] = "sub";
        x['children'] = this.parseChildrens(x.children || [])
        return x;
      })
    })
  }

  private parseChildrens(childrens) {
    return childrens.map(x => {
      return {
        state: x.route,
        name: x.name_option
      }
    })
  }
}
