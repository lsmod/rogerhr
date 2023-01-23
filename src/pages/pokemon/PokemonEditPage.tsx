import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { Field, Form } from "react-final-form";

import usePokemonUpdate from "../../api/hooks/usePokemonUpdate";
import { Pokemon } from "../../api/models/Pokemon";
import PageLoader from "../../components/PageLoader";

const PokemonEditPage = () => {
  const { pokemon, isLoading, error, update } = usePokemonUpdate();

  const onSubmit = async (data: any) => {
    update(data as Pokemon);
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.email = "Name is required";
    }

    return errors;
  };

  if (isLoading && !pokemon) {
    return <div>loading...</div>;
  }

  if (error) {
    return <PageLoader />;
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={pokemon}
      render={({ handleSubmit, submitting, invalid, form, ...props }) => (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field name="email">
              {({ input, meta }) => (
                <FormControl>
                  <InputLabel htmlFor="name">name address</InputLabel>
                  <Input
                    {...input}
                    id="name"
                    aria-describedby="name-helper-text"
                    type="name"
                    error={meta.touched && meta.error}
                  />
                  <FormHelperText id="name-helper-text">
                    Pokemon's name.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <LoadingButton loading={isLoading} type="submit" disabled={invalid}>
              Submit
            </LoadingButton>
          </div>
        </form>
      )}
    />
  );
};

export default PokemonEditPage;
