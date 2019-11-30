import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { useTheme } from "emotion-theming"
import React, { useEffect, useState } from "react"
import { Theme } from "../core/themes"

const Container = styled.div<{}, Theme>`
  height: 1.375em;
  display: flex;
  margin: 0 0 0 -80px;

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      height: auto;
      display: inline-flex;
      margin: 0 0 0 -9ch;
    `}

  ${({ theme }) =>
    theme.mobile &&
    css`
      margin: 0;
    `}
`

const Avatar = styled.img<{}, Theme>`
  position: relative;
  top: 2px;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin: 0 20px;

  cursor: pointer;

  object-fit: cover;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      display: none;
    `}
`

const HeaderInfo = styled.div<{}, Theme>`
  display: flex;
  align-items: center;
  flex-direction: row;

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      flex-direction: row-reverse;
    `}
`

const UserName = styled.span<{}, Theme>`
  color: ${({ theme }) => theme.header.primary};
  font-weight: 500;
  line-height: 1.375em;

  cursor: pointer;

  ${({ theme }) =>
    theme.color === "light" &&
    css`
      font-weight: 600;
    `}
`

const BotTag = styled.span<{}, Theme>`
  /* position: relative;
  top: calc(-0.1em + 1px);
  min-height: 1.26em; */

  padding: 0.072rem 0.275rem;

  border-radius: 3px;
  margin: 0.075em 0 0 0.3rem;

  background: ${({ theme }) => theme.accents.primary};

  color: #ffffff;
  font-size: 0.625em;
  font-weight: 500;
  line-height: 1.3;

  /* vertical-align: baseline; */

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      top: -0.218em;
      margin: 0.075em 0.3rem 0 0;
    `}
`

const Timestamp = styled.span<{}, Theme>`
  margin: 0 0 0 0.3rem;

  color: ${({ theme }) => theme.text.muted};
  font-size: 0.75rem;
  font-weight: 500;

  position: relative;
  top: 1px;

  &::before {
    content: "Today at ";
  }

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      top: 2px;

      width: calc(20px + 8ch);
      margin-left: 0;

      font-size: 0.6875rem;
      text-align: right;

      margin: 0 0.3rem 0 0;

      &::before {
        content: "";
      }
    `}
`

const getTimestamp = () =>
  new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  })

type Props = {
  username?: string
  avatarUrl?: string
}

export default function MessageHeader(props: Props) {
  const {
    username = "Discohook",
    avatarUrl = "https://discohook.jaylineko.com/assets/discord-avatar.png",
  } = props

  const [timestamp, setTimestamp] = useState(getTimestamp)

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(getTimestamp()), 1000)
    return () => clearInterval(interval)
  }, [])

  const theme = useTheme<Theme>()

  return (
    <Container>
      {theme.display === "cozy" && !theme.mobile && (
        <Avatar src={avatarUrl} alt="User avatar" />
      )}
      <HeaderInfo>
        <UserName>{username}</UserName>
        <BotTag>BOT</BotTag>
        <Timestamp>{timestamp}</Timestamp>
      </HeaderInfo>
    </Container>
  )
}
