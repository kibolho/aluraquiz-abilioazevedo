import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import BackLinkArrow from "../../../src/components/BackLinkArrow";
import Button from "../../../src/components/Button";
import Input from "../../../src/components/Input";
import Link from "../../../src/components/Link";
import QuizLogo from "../../../src/components/QuizLogo";
import Widget from "../../../src/components/Widget";

const CustomATag = styled(Link)`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;
  text-align: center;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

const schema = yup.object().shape({
  title: yup.string().required("Campo Obrigatório"),
  content: yup.string().required("Campo Obrigatório"),
  authorEmail: yup
    .string()
    .email("Email Inválido")
    .required("Campo Obrigatório"),
  authorName: yup.string().required("Campo Obrigatório"),
});

export default function AddQuizForm({ onSubmit, error }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const defaultValues = {
    title: title,
    content: content,
    authorEmail: authorEmail,
    authorName: authorName,
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  return (
    <>
      <QuizLogo />
      <Widget
        as={motion.section}
        transition={{ delay: 0, duration: 0.5 }}
        variants={{
          show: { opacity: 1, y: "0" },
          hidden: { opacity: 0, y: "100%" },
        }}
        initial="hidden"
        animate="show"
      >
        <Widget.Header>
          <BackLinkArrow href="/" />
          <h1>Crie seu Quiz</h1>
        </Widget.Header>
        <Widget.Content>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            style={{ height: "100%" }}
          >
            <Input
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Seu Nome"
              type="text"
              name="authorName"
              ref={register()}
              value={authorName}
            />
            <p>{errors.authorName?.message}</p>
            <Input
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="Seu Email"
              type="text"
              name="authorEmail"
              ref={register()}
              value={authorEmail}
            />
            <p>{errors.authorEmail?.message}</p>
            <Input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              type="text"
              name="title"
              ref={register()}
              value={title}
            />
            <p>{errors.title?.message}</p>
            <Input
              as={"textarea"}
              autoFocus
              onChange={(e) => {
                setContent(e.target.value);
              }}
              type="text"
              name="content"
              placeholder="Conteúdo do Quiz, deve seguir o padrão ao lado"
              rows={8}
              ref={register()}
              value={content}
            />
            <p>{errors.content?.message}</p>
            <p>{error}</p>
            <Button
              disabled={!content || !authorName || !title || !authorEmail}
              type="submit"
            >
              Criar
            </Button>
            <CustomATag href="/">Cancelar</CustomATag>
          </form>
        </Widget.Content>
      </Widget>
    </>
  );
}
