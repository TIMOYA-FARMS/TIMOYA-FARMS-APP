// Permissions utility for frontend role-based UI control
export const permissions = [
  {
    role: 'User',
    actions: [
      'viewProfile',
      'updateProfile',
      'viewProducts',
    ],
  },
  {
    role: 'Farmer',
    actions: [
      'viewProfile',
      'updateProfile',
      'manageCrops',
    ],
  },
  {
    role: 'Admin',
    actions: [
      'viewProfile',
      'viewProfiles',
      'updateProfile',
      'updateProfiles',
      'deleteProfile',
      'createProduct',
      'updateProduct',
      'deleteProduct',
      'viewProducts',
      'viewCarts',
      'viewReports',
      'createResource',
      'updateResource',
      'deleteResource',
      'createUser',
      'deleteUser',
    ],
  },
];

export function can(user, action) {
  if (!user || !user.role) return false;
  const rolePerms = permissions.find((p) => p.role === user.role || p.role === user.role.charAt(0).toUpperCase() + user.role.slice(1));
  return rolePerms && rolePerms.actions.includes(action);
} 