import { Avatar } from "@@/common/components/Avatar";
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "@@/common/components/Dropdown";
import { apiClients } from "@@/common/libs/api";
import { User } from "@@/common/libs/apiClient";
import { LOCALSTORAGE_AUTH_TOKEN, SESSION_STORAGE_USER_DETAILS } from "@@/common/libs/contants";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export function AccountMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const initials = useMemo(() => {
    if (user?.first_name) {
      return user?.first_name.charAt(0);
    }

    return "D";
  }, [user?.first_name]);

  const loadProfileDetails = useCallback(async () => {
    const userInSessionStorage = window.sessionStorage.getItem(SESSION_STORAGE_USER_DETAILS);

    if (!userInSessionStorage) {
      const { data } = await apiClients().AccountsApiFactory.getProfileDetails();
      window.sessionStorage.setItem(SESSION_STORAGE_USER_DETAILS, JSON.stringify(data.data));
      setUser(data.data);
    } else {
      setUser(JSON.parse(userInSessionStorage));
    }
  }, []);

  useEffect(() => {
    loadProfileDetails();
  }, [loadProfileDetails]);

  const logoutHandler = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
    sessionStorage.removeItem(SESSION_STORAGE_USER_DETAILS);
    router.push("/login");
  };

  return (
    <Dropdown Trigger={<Avatar label={initials} />}>
      <DropdownLabel>
        <div>
          {user?.first_name} {user?.last_name}
        </div>
        <UserEmail>{user?.email}</UserEmail>
      </DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>User settings</DropdownItem>
      <DropdownItem>Account settings</DropdownItem>
      <DropdownSeparator />
      <DropdownItem onClick={logoutHandler}>Log out</DropdownItem>
    </Dropdown>
  );
}

const UserEmail = styled.span`
  color: var(--color-zinc-400);
`;
