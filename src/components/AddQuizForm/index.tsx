import { CustomATag } from "@/components/CustomATag";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import BackLinkArrow from "../BackLinkArrow";
import Button from "../Button";
import Input from "../Input";
import QuizLogo from "../QuizLogo";
import Widget from "../Widget";

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

  const { register, handleSubmit, errors } = useForm({
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
              placeholder="Conteúdo do Quiz, deve seguir o modelo JSON abaixo, abra o modelo, altere os valores e questões e cole neste campo"
              rows={8}
              ref={register()}
              value={content}
            />
            <p>{errors.content?.message}</p>
            <p>{error}</p>
            <CustomATag
              href="/api/db"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir Modelo
            </CustomATag>
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
